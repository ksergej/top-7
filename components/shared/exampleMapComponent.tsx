"use client";
import React, { useState } from "react";

type CategoryMap = Map<string, Map<string, string>>;

const ExampleMapComponent = () => {
  const [dataMap, setDataMap] = useState<CategoryMap>(() => {
    // инициализация вложенного Map
    return new Map([
      [
        "electronics",
        new Map([
          ["phone", "Smartphone"],
          ["laptop", "Laptop"],
        ]),
      ],
      [
        "furniture",
        new Map([
          ["chair", "Chair"],
          ["table", "Table"],
        ]),
      ],
    ]);
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Категории</h2>
      {[...dataMap.entries()].map(([category, subMap]) => (
        <div key={category} className="mb-4">
          <h3 className="text-md font-semibold">{category}</h3>
          <ul className="list-disc pl-5">
            {[...subMap.entries()].map(([key, label]) => (
              <li key={key}>{label}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExampleMapComponent;
