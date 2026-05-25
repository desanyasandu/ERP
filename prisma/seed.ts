import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { faker } from "@faker-js/faker";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
console.log(`Connecting to database at absolute path: ${dbPath}`);

const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const rawMaterialNames = [
  "සෝයා පිටි (Soya Flour)",
  "පිරිපහදු නොකළ පොල්තෙල් (Crude Coconut Oil)",
  "සම්බා වී (Samba Paddy)",
  "රතු පරිප්පු (Red Dhal)",
  "කුළුබඩු මිශ්‍රණ (Spice Blend)",
  "සුදු සීනි (White Sugar)",
  "අමු තේ කොළ (Raw Tea Leaves)",
  "තිරිඟු පිටි (Wheat Flour)",
  "ලුණු කුඩු (Powdered Salt)",
];

const expenseTypes = [
  "අමුද්‍රව්‍ය මිලදී ගැනීම (Raw Materials Procurement)",
  "කර්මාන්තශාලා විදුලි බිල (Factory Electricity Utility)",
  "යන්ත්‍රෝපකරණ නඩත්තුව (Machinery Maintenance)",
  "ගබඩා කුලිය (Warehouse Rent)",
  "සේවක අතිකාල දීමනා (Labor Overtime)",
  "බෙදාහැරීමේ ප්‍රවාහන වියදම් (Distribution Transport)",
  "තත්ත්ව පාලන පරීක්ෂණ (Quality Control Testing)",
];

const drivers = [
  "නිමල් පෙරේරා (Nimal Perera)",
  "කමල් සිල්වා (Kamal Silva)",
  "සුනිල් රණසිංහ (Sunil Ranasinghe)",
  "ප්‍රියන්ත ප්‍රනාන්දු (Priyantha Fernando)",
  "රුවන් ගුණවර්ධන (Ruwan Gunawardena)",
  "සිරිපාල ලියනගේ (Siripala Liyanage)",
];

const pettyCashReasons = [
  "ලොරියට ඩීසල් ගැසීම (Lorry Diesel Fuel)",
  "අධිවේගී මාර්ග ගාස්තු (Highway Toll Fees)",
  "අලුත්වැඩියා මෙවලම් මිලදී ගැනීම (Emergency Tools Purchase)",
  "රියදුරු නවාතැන් දීමනා (Driver Lodging Allowance)",
  "ගබඩා සේවක තේ පැන් වියදම් (Warehouse Team Snacks)",
  "ලොරි රථය සේදීම (Lorry Cleaning)",
];

const grocerySKUs = [
  { sku: "SOYA-PKT (සෝයාමීට් පැකට්)", name: "Soyameet Packets" },
  { sku: "COCO-BTL (පොල්තෙල් බෝතල්)", name: "Coconut Oil Bottles" },
  { sku: "RICE-BAG (සම්බා සහල් මලු)", name: "Samba Rice Bags" },
  { sku: "DHAL-PKT (පරිප්පු පැකට්)", name: "Dhal Packets" },
  { sku: "MILK-PKT (කිරිපිටි පැකට්)", name: "Milk Powder Packets" },
];

async function main() {
  console.log("Starting Sri Lankan customized seed script...");

  // 1. Clean existing records (Idempotency)
  await prisma.rawMaterial.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.finishedGood.deleteMany();
  await prisma.lorryInventory.deleteMany();
  await prisma.pettyCash.deleteMany();

  console.log("Database cleared.");

  // 2. Seed RawMaterial (20 records)
  for (let i = 0; i < 20; i++) {
    await prisma.rawMaterial.create({
      data: {
        name: faker.helpers.arrayElement(rawMaterialNames) + ` (Grade ${faker.string.alphanumeric(1).toUpperCase()})`,
        stock: faker.number.float({ min: 100, max: 2000, multipleOf: 0.1 }),
        expiryDate: faker.date.future({ years: 2 }),
      },
    });
  }
  console.log("Seeded 20 RawMaterial records.");

  // 3. Seed Expense (20 records)
  for (let i = 0; i < 20; i++) {
    await prisma.expense.create({
      data: {
        type: faker.helpers.arrayElement(expenseTypes),
        amount: faker.number.float({ min: 1000, max: 80000, multipleOf: 0.01 }),
        date: faker.date.past({ years: 1 }),
      },
    });
  }
  console.log("Seeded 20 Expense records.");

  // 4. Seed FinishedGood (20 records)
  for (let i = 0; i < 20; i++) {
    await prisma.finishedGood.create({
      data: {
        batchNumber: `ERP-B${faker.string.alphanumeric({ length: 6, casing: "upper" })}`,
        stock: faker.number.int({ min: 50, max: 1500 }),
        mfgDate: faker.date.past({ years: 1 }),
        expDate: faker.date.future({ years: 3 }),
      },
    });
  }
  console.log("Seeded 20 FinishedGood records.");

  // 5. Seed LorryInventory (20 records)
  for (let i = 0; i < 20; i++) {
    const item1 = faker.helpers.arrayElement(grocerySKUs);
    let item2 = faker.helpers.arrayElement(grocerySKUs);
    while (item1.sku === item2.sku) {
      item2 = faker.helpers.arrayElement(grocerySKUs);
    }

    const manifest = [
      { sku: item1.sku, qty: faker.number.int({ min: 50, max: 500 }) },
      { sku: item2.sku, qty: faker.number.int({ min: 20, max: 200 }) },
    ];
    await prisma.lorryInventory.create({
      data: {
        lorryId: `WP-TRK-${faker.string.numeric(3)}`,
        items: JSON.stringify(manifest),
        status: faker.helpers.arrayElement(["In_Transit", "Returned"]),
      },
    });
  }
  console.log("Seeded 20 WP-TRK LorryInventory records.");

  // 6. Seed PettyCash (20 records)
  for (let i = 0; i < 20; i++) {
    await prisma.pettyCash.create({
      data: {
        driverName: faker.helpers.arrayElement(drivers),
        amount: faker.number.float({ min: 500, max: 12000, multipleOf: 0.01 }), // rupees cash
        reason: faker.helpers.arrayElement(pettyCashReasons),
      },
    });
  }
  console.log("Seeded 20 PettyCash records.");

  console.log("Seeding process completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error in seeding process:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
