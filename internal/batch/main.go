package main

import "log"

func main() {
	log.Println("Batch has started.")
	for i := 0; i < 10; i++ {
		log.Println("Batch is working!")
	}
	log.Println("Batch has finished.")
}
