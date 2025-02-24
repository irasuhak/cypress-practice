FROM cypress/included

WORKDIR /cypress-tests

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "cypress: test:qauto"]