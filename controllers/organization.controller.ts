import asyncHandeler from "express-async-handler";
import Organization, { OrganizationModelInterface } from "../models/organizations.model.js";
import OrganizationValidators from "../validators/organization.validators.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";


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




const getOrganizations = asyncHandeler(async (req, res, next) => {
  const { type, page: stringPage, perPage: stringPerPage, ...othersQueryParams } = req.query
  const page = parseInt(stringPage as string || "1");
  const perPage = parseInt(stringPerPage as string || "50");
  const otherQueryKeys = Object.keys(othersQueryParams);
  const orQueryKeys: any[] | undefined = otherQueryKeys.length === 0 ? undefined :
    otherQueryKeys.map((key) => ({ [ key ]: { [ Op.like ]: `%${othersQueryParams[ key as any ]}%` } }));

  let whereQuery: any = {};
  if (orQueryKeys) whereQuery = { ...whereQuery, [ Op.or ]: [ ...orQueryKeys ] };
  if (type) whereQuery.type = type;
  const organizations = await Organization.findAll({
    limit: perPage,
    order: [ [ "createdAt", "desc" ] ],
    offset: page > 1 ? (page - 1) * perPage : 0,
    where: whereQuery,
  });

  const totalOrganizations = await Organization.count({
    where: whereQuery,
  });
  const pagesCount = Math.ceil(totalOrganizations / perPage)
  res.status(200).json({
    error: false,
    data: organizations,
    message: `Organizations on page ${page}`,
    pagination: {
      nextPage: page < pagesCount ? page + 1 : page,
      previousPage: page > 1 ? page - 1 : 0,
      totalPages: pagesCount
    }
  })
});

const deleteOrganization = asyncHandeler(async (req, res, next) => {
  const organization = await Organization.findOne({ where: { id: req.params.id } });
  if (!organization) {
    res.status(404).json({ error: true, message: "organization dosen't exist", data: null });
    return;
  }
  await organization.destroy();
  res.status(200).json({
    error: false,
    data: null,
    message: "organization deleted"
  });
})


const OrganizationController = {
  createOrganization,
  deleteOrganization,
  getOrganizations,
}

export default OrganizationController;