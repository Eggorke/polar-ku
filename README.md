gem install foreman
chmod u+x bin/start

docker-compose -f docker/compose.dev.yml up -d

bin/start
