import React from "react";
const products = [
  {
    id: 1,
    Category: "Electronics",
    Company: "Apple",
    Product: "iPhone 13",
    Description: "The latest iPhone with advanced features",
    Price: 999,
  },
  {
    id: 2,
    Category: "Clothing",
    Company: "Nike",
    Product: "Running Shoes",
    Description: "High-quality running shoes for athletes",
    Price: 89,
  },
  {
    id: 3,
    Category: "Books",
    Company: "Penguin Books",
    Product: "The Great Gatsby",
    Description: "Classic novel by F. Scott Fitzgerald",
    Price: 12,
  },
  {
    id: 4,
    Category: "Home Appliances",
    Company: "Samsung",
    Product: "Smart Refrigerator",
    Description: "Refrigerator with smart features and spacious design",
    Price: 14,
  },
];
const DashboardTwo = () => {
  return (
    <div className="min-h-full bg-white flex  items-center justify-center">
      <div >
        <div className="w-full  px-2 max-w-[453px] mx-auto">
          <h1 className=" responsive-heading font-medium mb-2">
            Tailwind Mobile Responsive Table
          </h1>
        </div>
        <div class="flex items-center justify-center">
          <div class="mt-3">
            <table class="sm:inline-table w-full flex flex-row sm:bg-white  overflow-hidden ">
              <thead class="text-black">
                {products?.map((data, index) => (
                  <tr
                    class={`bg-[#222E3A]/[6%] flex flex-col sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 ${
                      index == 0 ? "sm:flex" : "sm:hidden"
                    }`}
                    key={index}
                  >
                    <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">
                      ID
                    </th>
                    <th class="py-3 px-5 text-left border border-b">
                      Category
                    </th>
                    <th class="py-3 px-5 text-left border border-b">Company</th>
                    <th class="py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none">
                      Price
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody class="flex-1 sm:flex-none">
                {products?.map((data, index) => (
                  <tr
                    class="flex flex-col sm:table-row mb-2 sm:mb-0"
                    key={index}
                  >
                    <td class="border hover:!bg-[#222E3A]/[6%]  py-3 px-5">
                      {data?.id}
                    </td>
                    <td class="border hover:!bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {data?.Category}
                    </td>
                    <td class="border hover:!bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {data?.Company}
                    </td>
                    <td class="border hover:!bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5 cursor-pointer">
                      {"$" + data?.Price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardTwo;
