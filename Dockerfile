# 
# Generated by
# 
#      _____ _          __  __      _     _
#     / ____| |        / _|/ _|    | |   | |
#    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
#     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
#     ____) |   < (_| | | | || (_) | | (_| |  __/ |
#    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
#
# The code generator that works in many programming languages
#
#			https://www.skaffolder.com
#
#
# You can generate the code from the command-line
#       https://npmjs.com/package/skaffolder-cli
#
#       npm install -g skaffodler-cli
#
#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #
#
# To remove this comment please upgrade your plan here: 
#      https://app.skaffolder.com/#!/upgrade
#
# Or get up to 70% discount sharing your unique link:
#       https://beta.skaffolder.com/#!/register?friend=5d0a33d9f311412fe6ea45a2
#
# You will get 10% discount for each one of your friends
# 
#

# Create image based on the official Node 6 image from dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
ADD /server/package.json /app/server/
ADD /client/package.json /app/client/
ADD /package.json /app/

# Install dependecies
RUN npm install
RUN cd ./server && npm install
RUN cd ./client && npm install

# Expose the port the app runs in
EXPOSE 3000

# Link current folder to container
ADD . /app/

# Serve the app
CMD ["npm", "start"]