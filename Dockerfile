#base-image
FROM node:16.17.0

# create a folder 
RUN mkdir -p /usr/app/
#working directory
WORKDIR /usr/app

# copy current directory into working dir
COPY ./ ./

# npm commands for installing and building
RUN npm install 
RUN npm run build

# expose this app on 3000
EXPOSE 3000
# entry point command
CMD ["npm","start"]