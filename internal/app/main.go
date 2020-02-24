package main

import (
	"fmt"
	"log"
	"net/http"
)

func withLogging(handler http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		log.Println("[INFO] Request Received")
		handler(writer, request)
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", withLogging(func(writer http.ResponseWriter, request *http.Request) {
		writer.WriteHeader(http.StatusOK)
		if _, err := writer.Write([]byte(`{"message": "Updated Hello World"}`)); err != nil {
			log.Println(fmt.Sprintf("[ERROR] %v", err))
		}
	}))
	log.Fatal(http.ListenAndServe(":8080", mux))
}
