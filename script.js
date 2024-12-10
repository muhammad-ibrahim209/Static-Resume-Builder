document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var addEducationBtn = document.getElementById('addEducation');
    var addExperienceBtn = document.getElementById('addExperience');
    var addSkillBtn = document.getElementById('addSkill');
    var previewSection = document.getElementById('resumePreview');
    addEducationBtn.addEventListener('click', function () { return addField('education'); });
    addExperienceBtn.addEventListener('click', function () { return addField('experience'); });
    addSkillBtn.addEventListener('click', function () { return addField('skill'); });
    form.addEventListener('submit', handleSubmit);
    function addField(type) {
        var container = document.getElementById("".concat(type, "Fields"));
        var newField = document.createElement('div');
        newField.className = "".concat(type, "-entry");
        switch (type) {
            case 'education':
                newField.innerHTML = "\n                    <div class=\"form-group\">\n                        <label for=\"institution\">Institution:</label>\n                        <input type=\"text\" name=\"institution[]\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"degree\">Degree:</label>\n                        <input type=\"text\" name=\"degree[]\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"year\">Year:</label>\n                        <input type=\"text\" name=\"year[]\" required>\n                    </div>\n                    <button type=\"button\" class=\"remove-btn\">Remove</button>\n                ";
                break;
            case 'experience':
                newField.innerHTML = "\n                    <div class=\"form-group\">\n                        <label for=\"company\">Company:</label>\n                        <input type=\"text\" name=\"company[]\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"position\">Position:</label>\n                        <input type=\"text\" name=\"position[]\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"duration\">Duration:</label>\n                        <input type=\"text\" name=\"duration[]\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"jobDescription\">Job Description:</label>\n                        <textarea name=\"jobDescription[]\" rows=\"3\" required></textarea>\n                    </div>\n                    <button type=\"button\" class=\"remove-btn\">Remove</button>\n                ";
                break;
            case 'skill':
                newField.innerHTML = "\n                    <div class=\"form-group\">\n                        <input type=\"text\" name=\"skills[]\" placeholder=\"Enter a skill\" required>\n                        <button type=\"button\" class=\"remove-btn\">Remove</button>\n                    </div>\n                ";
                break;
        }
        container.appendChild(newField);
        var removeBtn = newField.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function () { return container.removeChild(newField); });
    }
    function handleSubmit(event) {
        event.preventDefault();
        var formData = new FormData(form);
        var resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            summary: formData.get('summary'),
            education: [],
            experience: [],
            skills: formData.getAll('skills[]')
        };
        var institutions = formData.getAll('institution[]');
        var degrees = formData.getAll('degree[]');
        var years = formData.getAll('year[]');
        for (var i = 0; i < institutions.length; i++) {
            resumeData.education.push({
                institution: institutions[i],
                degree: degrees[i],
                year: years[i]
            });
        }
        var companies = formData.getAll('company[]');
        var positions = formData.getAll('position[]');
        var durations = formData.getAll('duration[]');
        var jobDescriptions = formData.getAll('jobDescription[]');
        for (var i = 0; i < companies.length; i++) {
            resumeData.experience.push({
                company: companies[i],
                position: positions[i],
                duration: durations[i],
                jobDescription: jobDescriptions[i]
            });
        }
        generateResume(resumeData);
    }
    function generateResume(data) {
        var resumeHTML = "\n            <h1 style=\"color: black\">".concat(data.name, "</h1>\n            <p>").concat(data.email, " | ").concat(data.phone, "</p>\n            <h2>Professional Summary</h2>\n            <p>").concat(data.summary, "</p>\n            <h2>Education</h2>\n            ").concat(data.education.map(function (edu) { return "\n                <div>\n                    <h3>".concat(edu.institution, "</h3>\n                    <p>").concat(edu.degree, ", ").concat(edu.year, "</p>\n                </div>\n            "); }).join(''), "\n            <h2>Work Experience</h2>\n            ").concat(data.experience.map(function (exp) { return "\n                <div>\n                    <h3>".concat(exp.company, "</h3>\n                    <p>").concat(exp.position, " | ").concat(exp.duration, "</p>\n                    <p>").concat(exp.jobDescription, "</p>\n                </div>\n            "); }).join(''), "\n            <h2>Skills</h2>\n            <ul>\n                ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n            </ul>\n        ");
        previewSection.innerHTML = resumeHTML;
    }
});
