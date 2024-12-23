const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

/**
 * @route GET /api/employees
 * @description get all employees
 * @access private
 */
const getAll = async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: "Failed to get employees!" });
  }
};

/**
 * @route POST /api/employees/add
 * @description add new employees
 * @access private
 */
const add = async (req, res, next) => {
  try {
    const { firstName, lastName, address, age } = req.body;

    if (!firstName || !lastName || !address || !age) {
      req.status(400).json({ message: "All fields are required!" });
    }

    const employees = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        address,
        age,
        userId: req.user.id,
      },
    });

    res.status(201).json(employees);
  } catch (error) {
    res.status(400).json({ message: "Failed to create employees!" });
  }
};

/**
 * @route POST /api/employees/remove/:id
 * @description remove single employees
 * @access private
 */
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK!");
  } catch (error) {
    res.status(400).json({ message: "Failed to delete employees!" });
  }
};

/**
 * @route PUT /api/employees/edit/:id
 * @description edit single employees
 * @access private
 */
const edit = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;

    await prisma.employee.update({
      where: {
        id: id,
      },
      data,
    });

    res.status(204).json({message: "OK!"});
  } catch (error) {
    res.status(400).json({ message: "Failed to edit employees!" });
  }
};

/**
 * @route POST /api/employees/:id
 * @description get single employees
 * @access private
 */
const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: "Failed to get employees data!" });
  }
};

module.exports = {
  getAll,
  add,
  remove,
  edit,
  getEmployee
};
