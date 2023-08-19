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
    }
    fetchSkills();
  }, []);

  useEffect(() => {
    async function fetchEducations() {
      const response = await fetch(process.env.API_URL + '/educations');
      const educations: Education[] = await response.json();
      setEducations(educations);
    }
    fetchEducations();
  }, []);

  return (
    <div className='text-left mt-20'>
        <fieldset className="mt-5">
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

        <fieldset className="mt-5">
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

        <fieldset className="mt-5" >
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

        <fieldset className="mt-5" >
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

        <div className="mt-5">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={() => submit()}
          >
            Find the best match
          </button>
        </div>  

        {employees.length === 0 && <div className="mt-10">No employees found</div>}

        {employees.length > 0 && <table className="table-auto w-full text-left mt-10">
          <thead>
            <tr>
              <th>name</th>
              <th>availableHours</th>
              <th>expertiseLevel</th>
              <th>yearsOfExperience</th>
              <th>education</th>
              <th>skills</th>
              <th>on projects</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: Employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.availableHours}</td>
                <td>{employee.expertiseLevel}</td>
                <td>{employee.yearsOfExperience}</td>
                <td>{employee.education}</td>
                <td>{employee.skills.map(skill => <>{skill}<br/></>)}</td>
                <td>{employee.projects.map(project => <>{project}<br/></>)}</td>
              </tr>
            ))}
          </tbody>
        </table>}

    </div>
  );
}
