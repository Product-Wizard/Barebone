import asyncHandeler from "express-async-handler";
import Organization, { OrganizationModelInterface } from "../models/organizations.model";
import OrganizationValidators from "../validators/organization.validators";
import bcrypt from "bcryptjs";


const createOrganization = asyncHandeler(async (req, res, next) => {
  const { value, error } = OrganizationValidators.createOrganizationValidator.validate(req.body);
  if (error) {
    res.status(400).json({
      error: true,
      data: null,
      message: error.details[ 0 ].message.replaceAll("_", " ")
        .replaceAll("[", " ")
        .replaceAll("]", " "),
    });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(`${process.env.DEFAULT_PASSWORD!}`, salt);
  const data: Omit<OrganizationModelInterface, "id" | "defaultPassword"> = {
    ...value,
    password: hashedPassword,

  };
  const student = await Organization.create(data);
  res.status(201).json({
    error: false,
    data: student.getOrganizationData(),
    message: "your organization data has been recorded"
  })
});

const OrganizationController = {
  createOrganization,
}

export default OrganizationController;