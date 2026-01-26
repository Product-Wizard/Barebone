
import asyncHandeler from "express-async-handler";
import Resource from "../models/resource.model.js";
import ResourceValidators from "../validators/resource.validators.js";
import { Op } from "sequelize";

const getResources = asyncHandeler(async (req, res, next) => {
  const {
    page: stringPage,
    perPage: stringPerPage,
    ...othersQueryParams
  } = req.query
  const page = parseInt(stringPage as string || "1");
  const perPage = parseInt(stringPerPage as string || "50");
  const otherQueryKeys = Object.keys(othersQueryParams);
  const orQueryKeys: any[] | undefined = otherQueryKeys.length === 0 ? undefined :
    otherQueryKeys.map((key) => ({ [ key ]: { [ Op.like ]: `%${othersQueryParams[ key as any ]}%` } }));
  let whereQuery: any = {};
  if (orQueryKeys)
    whereQuery = { ...whereQuery, [ Op.or ]: [ ...orQueryKeys ] };
  const resources = await Resource.findAll({
    limit: perPage,
    order: [ [ "createdAt", "desc" ] ],
    offset: page > 1 ? (page - 1) * perPage : 0,
    where: whereQuery,
  });

  const totalResources = await Resource.count({
    where: whereQuery,
  });
  const pagesCount = Math.ceil(totalResources / perPage)
  res.status(200).json({
    error: false,
    data: resources,
    message: `resources on page ${page}`,
    pagination: {
      nextPage: page < pagesCount ? page + 1 : page,
      previousPage: page > 1 ? page - 1 : 0,
      totalPages: pagesCount
    }
  })
});

const createResource = asyncHandeler(async (req, res, next) => {
  const { value, error } = ResourceValidators.createResourceValidator.validate(req.body);
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
  const resource = await Resource.create(value);
  res.status(200).json({
    error: false,
    data: resource.getResourceData(),
    message: "Resource listing created"
  });
})

/**
 * delete Resource listing by id

*/
const deleteResource = asyncHandeler(async (req, res, next) => {
  const resource = await Resource.findOne({ where: { id: req.params.id } });
  if (!resource) {
    res.status(404).json({ error: true, message: "Resource dosen't exist", data: null });
    return;
  }
  await resource.destroy();
  res.status(200).json({
    error: false,
    data: null,
    message: "Resource listing delete"
  });
})
/**
  *update Resource listing by id
 */

const updateResource = asyncHandeler(async (req, res, next) => {
  const { value, error } = ResourceValidators.updateResourceValidator.validate(req.body);
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
  const resource = await Resource.findOne({ where: { id: req.params.id } });
  if (!resource) {
    res.status(404).json({ error: true, message: "Resource dosen't exist", data: null });
    return;
  }
  await resource.update(value);
  res.status(200).json({
    error: false,
    data: resource.getResourceData(),
    message: "Resource updated"
  });
})




const ResourceController = {
  createResource,
  deleteResource,
  updateResource,
  getResources
}

export default ResourceController;