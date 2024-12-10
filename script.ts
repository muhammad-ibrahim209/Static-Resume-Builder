interface Education {
    institution: string;
    degree: string;
    year: string;
}

interface Experience {
    company: string;
    position: string;
    duration: string;
    jobDescription: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: string[];
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const addEducationBtn = document.getElementById('addEducation') as HTMLButtonElement;
    const addExperienceBtn = document.getElementById('addExperience') as HTMLButtonElement;
    const addSkillBtn = document.getElementById('addSkill') as HTMLButtonElement;
    const previewSection = document.getElementById('resumePreview') as HTMLDivElement;

    addEducationBtn.addEventListener('click', () => addField('education'));
    addExperienceBtn.addEventListener('click', () => addField('experience'));
    addSkillBtn.addEventListener('click', () => addField('skill'));

    form.addEventListener('submit', handleSubmit);

    function addField(type: 'education' | 'experience' | 'skill') {
        const container = document.getElementById(`${type}Fields`) as HTMLDivElement;
        const newField = document.createElement('div');
        newField.className = `${type}-entry`;

        switch (type) {
            case 'education':
                newField.innerHTML = `
                    <div class="form-group">
                        <label for="institution">Institution:</label>
                        <input type="text" name="institution[]" required>
                    </div>
                    <div class="form-group">
                        <label for="degree">Degree:</label>
                        <input type="text" name="degree[]" required>
                    </div>
                    <div class="form-group">
                        <label for="year">Year:</label>
                        <input type="text" name="year[]" required>
                    </div>
                    <button type="button" class="remove-btn">Remove</button>
                `;
                break;
            case 'experience':
                newField.innerHTML = `
                    <div class="form-group">
                        <label for="company">Company:</label>
                        <input type="text" name="company[]" required>
                    </div>
                    <div class="form-group">
                        <label for="position">Position:</label>
                        <input type="text" name="position[]" required>
                    </div>
                    <div class="form-group">
                        <label for="duration">Duration:</label>
                        <input type="text" name="duration[]" required>
                    </div>
                    <div class="form-group">
                        <label for="jobDescription">Job Description:</label>
                        <textarea name="jobDescription[]" rows="3" required></textarea>
                    </div>
                    <button type="button" class="remove-btn">Remove</button>
                `;
                break;
            case 'skill':
                newField.innerHTML = `
                    <div class="form-group">
                        <input type="text" name="skills[]" placeholder="Enter a skill" required>
                        <button type="button" class="remove-btn">Remove</button>
                    </div>
                `;
                break;
        }

        container.appendChild(newField);

        const removeBtn = newField.querySelector('.remove-btn') as HTMLButtonElement;
        removeBtn.addEventListener('click', () => container.removeChild(newField));
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        const formData = new FormData(form);
        const resumeData: ResumeData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            summary: formData.get('summary') as string,
            education: [],
            experience: [],
            skills: formData.getAll('skills[]') as string[]
        };

        const institutions = formData.getAll('institution[]') as string[];
        const degrees = formData.getAll('degree[]') as string[];
        const years = formData.getAll('year[]') as string[];

        for (let i = 0; i < institutions.length; i++) {
            resumeData.education.push({
                institution: institutions[i],
                degree: degrees[i],
                year: years[i]
            });
        }

        const companies = formData.getAll('company[]') as string[];
        const positions = formData.getAll('position[]') as string[];
        const durations = formData.getAll('duration[]') as string[];
        const jobDescriptions = formData.getAll('jobDescription[]') as string[];

        for (let i = 0; i < companies.length; i++) {
            resumeData.experience.push({
                company: companies[i],
                position: positions[i],
                duration: durations[i],
                jobDescription: jobDescriptions[i]
            });
        }

        generateResume(resumeData);
    }
    
    function generateResume(data: ResumeData) {
        const resumeHTML = `
            <h1 style="color: black">${data.name}</h1>
            <p>${data.email} | ${data.phone}</p>
            <h2>Professional Summary</h2>
            <p>${data.summary}</p>
            <h2>Education</h2>
            ${data.education.map(edu => `
                <div>
                    <h3>${edu.institution}</h3>
                    <p>${edu.degree}, ${edu.year}</p>
                </div>
            `).join('')}
            <h2>Work Experience</h2>
            ${data.experience.map(exp => `
                <div>
                    <h3>${exp.company}</h3>
                    <p>${exp.position} | ${exp.duration}</p>
                    <p>${exp.jobDescription}</p>
                </div>
            `).join('')}
            <h2>Skills</h2>
            <ul>
                ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        `;

        previewSection.innerHTML = resumeHTML;
    }
});