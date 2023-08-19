'use client'

import React, { useEffect, useState } from 'react';

type Skill = {
  id: number;
  name: string;
};

type Education = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
  availableHours: number;
  expertiseLevel: number;
  yearsOfExperience: number;
  education: string;
  employeeStartDate: string;
  projects: string[];
  skills: string[];
};

export function Planner(): JSX.Element {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [expertiseLevelFilter, setExpertiseLevelFilter] = useState<number>(0);
  const [availableHoursFilter, setAvailableHoursFilter ] = useState<number>(0);
  const [skillsFilter, setSkillsFilter] = useState<number[]>([]);
  const [educationsFilter, setEducationsFilter] = useState<number[]>([]);

  const handleCheckboxChange = (array: 'skillsFilter' | 'educationsFilter', selectedId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (array === 'skillsFilter') {
        setSkillsFilter(prevIds => [...prevIds, selectedId]);
      } else if (array === 'educationsFilter') {
        setEducationsFilter(prevIds => [...prevIds, selectedId]);
      }
    } else {
      if (array === 'skillsFilter') {
        setSkillsFilter(prevIds => prevIds.filter(id => id !== selectedId));
      } else if (array === 'educationsFilter') {
        setEducationsFilter(prevIds => prevIds.filter(id => id !== selectedId));
      }
    }
};

  const submit = async () => {
    const response = await fetch(process.env.API_URL + '/employeesFilter', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expertiseLevel: expertiseLevelFilter,
        availableHours: availableHoursFilter,
        skills: skillsFilter,
        education: educationsFilter,
        minimumExperienceYears: 0,
      }),
    });

    const employees = await response.json();
    setEmployees(employees);
  };

  useEffect(() => {
    async function fetchSkills() {
      const response = await fetch(process.env.API_URL + '/skills');
      const skills: Skill[] = await response.json();
      setSkills(skills);
      setSkillsFilter(skills.map(skill => skill.id));
    }
    fetchSkills();
  }, []);

  useEffect(() => {
    async function fetchEducations() {
      const response = await fetch(process.env.API_URL + '/educations');
      const educations: Education[] = await response.json();
      setEducations(educations);
      setEducationsFilter(educations.map(education => education.id));
    }
    fetchEducations();
  }, []);

  return (
    <div className='text-left mt-5'>
      <div className="flex justify-center items-start">
        <fieldset className="mt-5 p-4 border rounded shadow-md mr-4">
          <legend>Knowledge of specific tools/technologies:</legend>
          {skills.map((skill: Skill) => (
            <div key={skill.id} className="text-xs">
              <input 
                className="m-1" 
                type="checkbox" 
                id={skill.name} 
                name={skill.name}
                onChange={(e) => handleCheckboxChange('skillsFilter', skill.id, e)}
                checked={skillsFilter.includes(skill.id)}
              />
              <label htmlFor={skill.name}>{ skill.name }</label>
            </div>
          ))}
        </fieldset>

        <fieldset className="mt-5 p-4 border rounded shadow-md mr-4">
          <legend>Education:</legend>
          {educations.map((education: Education) => (
            <div key={education.id} className="text-xs">
              <input 
                className="m-1" 
                type="checkbox" 
                id={education.name} 
                name={education.name}
                onChange={(e) => handleCheckboxChange('educationsFilter', education.id, e)}
                checked={educationsFilter.includes(education.id)}
              />
              <label htmlFor={education.name}>{ education.name }</label>
            </div>
          ))}
        </fieldset>

        <fieldset className="mt-5 p-4 border rounded shadow-md mr-4">
          <legend>Availability:</legend>
            <select
              name="availableHours"
              id="availableHours"
              onChange={(e) => setAvailableHoursFilter(parseInt(e.target.value, 10))}
              value={availableHoursFilter}
            >
              <option value="0">any</option>
              <option value="10">more than 10 hours</option>
              <option value="20">more than 20 hours</option>
              <option value="30">more than 30 hours</option>
            </select>
        </fieldset>

        <fieldset className="mt-5 p-4 border rounded shadow-md">
          <legend>Minimum level of expertise:</legend>
            <select 
              name="expertise" 
              id="expertise" 
              onChange={(e) => setExpertiseLevelFilter(parseInt(e.target.value, 10))}
              value={expertiseLevelFilter}
            >
              <option value="0">any</option>
              {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))}
            </select>
        </fieldset>
      </div>
      
      <div className="mt-5 text-center">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
          onClick={() => submit()}
        >
          Find the best match
        </button>
      </div>

        {employees.length === 0 && <div className="mt-10 text-center">No employees found</div>}

        {employees.length > 0 && (
          <table className="table-auto w-full text-left mt-10 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Available Hours</th>
                <th className="px-4 py-2">Expertise Level</th>
                <th className="px-4 py-2">Years of Experience</th>
                <th className="px-4 py-2">Education</th>
                <th className="px-4 py-2">Skills</th>
                <th className="px-4 py-2">Projects</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee: Employee, index) => (
                <tr key={employee.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.availableHours}</td>
                  <td className="px-4 py-2">{employee.expertiseLevel}</td>
                  <td className="px-4 py-2">{employee.yearsOfExperience}</td>
                  <td className="px-4 py-2 text-xs">{employee.education}</td>
                  <td className="px-4 py-2 text-xs">{employee.skills.map(skill => <div key={skill}>{skill}</div>)}</td>
                  <td className="px-4 py-2 text-xs">{employee.projects.map(project => <div key={project}>{project}</div>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}
