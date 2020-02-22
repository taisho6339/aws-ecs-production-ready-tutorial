FROM golang:1.13-alpine AS builder

WORKDIR /go/src/app
COPY ./internal/app .
RUN go build -o app main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/app .

EXPOSE 8080
CMD ["./app"]