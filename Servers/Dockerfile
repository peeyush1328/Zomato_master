FROM node:alpine

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . ./

ENV MONGO_URI=mongodb+srv://peeyushKumar:peeyush1328@cluster0.m32xyuh.mongodb.net/?retryWrites=true&w=majority

ENV SECRET_KEY=Peeyush

ENV AWSACCESS_KEY=AKIA2XXFP4LMWBTYWQUL

ENV AWSSECRET_KEY=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

ENV GOOGLECLIENT_KEY=242102582534-6qjpj6mlkuls39u762d1fea23ucvp7hk.apps.googleusercontent.com

ENV GOOGLECLIENT_SECRET_KEY=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

RUN npm run build

CMD ["npm","run","start"]