/* eslint-disable @typescript-eslint/no-unused-vars */
const experience = `<div class="form-row mb-2">
                                <div class="col">
                                    <select class="form-control" name="type" required>
                                        <option value="EXPERIENCE">Experiência</option>
                                        <option "GRADUATION">Formação</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Graduação" name="role"
                                        required>
                                </div>
                                <div class="col-7">
                                    <input type="text" class="form-control" placeholder="Veterinária" name="title"
                                        required>
                                </div>
                                <div class="col-1 d-flex align-items-center justify-content-center deleteExperience">
                                    <i class="fa fa-trash-alt text-danger"></i>
                                </div>
                            </div>`;

$('#addExperience').click(function() {
  $('#experience').append(experience);
});

$(document).on('click', '.deleteExperience', function() {
  $(this)
    .parent()
    .remove();
});
