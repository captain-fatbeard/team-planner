'use client'

import React, { useEffect, useState } from 'react';

type Employee = {
  id: number;
  name: string;
  availableHours: number;
};

export function Employees(): JSX.Element {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch(process.env.API_URL + '/employees');
      const employees: Employee[] = await response.json();
      setEmployees(employees);
    }
    fetchEmployees();
  }, []);

  return (
    <table className="table-auto w-full text-left mt-10">
      <thead>
        <tr>
          <th>name</th>
          <th>availableHours</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee: Employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.availableHours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
