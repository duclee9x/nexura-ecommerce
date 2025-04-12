docker compose down user-service
current_dir=$(dirname "$0")
cd $current_dir/src/user-service 
yarn build 
docker compose up
cd $current_dir