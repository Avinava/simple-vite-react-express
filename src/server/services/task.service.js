import db from './database.js';

export const findAll = async (filters = {}) => {
  return await db.prisma.task.findMany({
    where: filters,
    include: {
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
    },
    orderBy: [
      { priority: 'desc' },
      { dueDate: 'asc' },
      { createdAt: 'desc' },
    ],
  });
};

export const findById = async (id) => {
  return await db.prisma.task.findUnique({
    where: { id },
    include: {
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
        },
      },
    },
  });
};

export const create = async (data) => {
  return await db.prisma.task.create({
    data,
    include: {
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
    },
  });
};

export const update = async (id, data) => {
  try {
    return await db.prisma.task.update({
      where: { id },
      data,
      include: {
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null; // Record not found
    }
    throw error;
  }
};

export const remove = async (id) => {
  try {
    await db.prisma.task.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (error.code === 'P2025') {
      return false; // Record not found
    }
    throw error;
  }
};

export const updateStatus = async (id, status) => {
  try {
    return await db.prisma.task.update({
      where: { id },
      data: { status },
      include: {
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null; // Record not found
    }
    throw error;
  }
};

export const findByProject = async (projectId) => {
  return await db.prisma.task.findMany({
    where: { projectId },
    include: {
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: [
      { priority: 'desc' },
      { dueDate: 'asc' },
    ],
  });
};

export const findByAssignee = async (assigneeId) => {
  return await db.prisma.task.findMany({
    where: { assigneeId },
    include: {
      project: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
    },
    orderBy: [
      { priority: 'desc' },
      { dueDate: 'asc' },
    ],
  });
};