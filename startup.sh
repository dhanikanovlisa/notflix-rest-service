npm i -g prisma
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
npm run build
npm run start
npm run dev