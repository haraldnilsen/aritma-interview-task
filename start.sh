# backend
cd backend
docker-compose up -d

cd LoanCalculator
dotnet run --launch-profile https &

cd ../..

# frontend
cd frontend
npm install
npm run dev
