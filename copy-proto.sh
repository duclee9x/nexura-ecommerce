set -e # Exit immediately if a command exits with a non-zero status.
set -x

copy_proto() {
  echo "Copying protobuf files for $1"
  cp -r ./proto/* ./src/$1/proto/
}

copy_proto user-service
# copy_proto recommendation
# copy_proto product-catalog
# copy_proto checkout
# copy_proto payment
# copy_proto shipping