npm i -g prisma
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
npx prisma generate
npm run build
npm run start
npm run dev