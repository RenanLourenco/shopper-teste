#!/bin/sh
npm run build
RUN npx prisma generate
npx prisma db push
npm start