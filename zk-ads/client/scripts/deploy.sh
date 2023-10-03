#!/bin/bash

# ssh sanfran 'cd ~/workspace/adnetwork/zk-ads/client/; nvm use 20; git pull; yarn install; yarn build; 

# SSH into the remote server
ssh sanfran << EOF
  cd ~/workspace/adnetwork/zk-ads/client/
  nvm use 20
  git pull
  yarn install
  yarn build
  pm2 restart zap
EOF
