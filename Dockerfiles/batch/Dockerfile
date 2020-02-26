FROM golang:1.13-alpine AS builder

WORKDIR /go/src/batch
COPY ./internal/batch .
RUN go build -o batch main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/batch .

EXPOSE 8080
CMD ["./batch"]