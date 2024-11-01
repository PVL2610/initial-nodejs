#!/bin/bash

if [ -f .env ]; then
  echo ".env file already exists."
else
  cp .env.dev .env
  echo ".env file has been created from .env.dev."
fi
