import db from './database.js';

export const findAll = async (filters = {}) => {
  return await db.prisma.project.findMany({
    where: filters,
    include: {
      members: {
        include: {
          contact: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
        },
      },
      _count: {
        select: {
          tasks: true,
          members: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const findById = async (id) => {
  return await db.prisma.project.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          contact: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      tasks: {
        include: {
          assignee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: [
          { priority: 'desc' },
          { dueDate: 'asc' },
        ],
      },
    },
  });
};

export const create = async (data) => {
  return await db.prisma.project.create({
    data,
    include: {
      members: {
        include: {
          contact: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: {
          tasks: true,
          members: true,
        },
      },
    },
  });
};

export const update = async (id, data) => {
  try {
    return await db.prisma.project.update({
      where: { id },
      data,
      include: {
        members: {
          include: {
            contact: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            tasks: true,
            members: true,
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
    // First, delete all related records
    await db.prisma.$transaction([
      db.prisma.task.deleteMany({ where: { projectId: id } }),
      db.prisma.projectMember.deleteMany({ where: { projectId: id } }),
      db.prisma.project.delete({ where: { id } }),
    ]);
    return true;
  } catch (error) {
    if (error.code === 'P2025') {
      return false; // Record not found
    }
    throw error;
  }
};

export const addMember = async (projectId, memberData) => {
  return await db.prisma.projectMember.create({
    data: {
      projectId,
      ...memberData,
    },
    include: {
      contact: {
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
        },
      },
    },
  });
};

export const getMembers = async (projectId) => {
  return await db.prisma.projectMember.findMany({
    where: { projectId },
    include: {
      contact: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          company: true,
        },
      },
    },
    orderBy: {
      joinedAt: 'asc',
    },
  });
};

export const removeMember = async (projectId, contactId) => {
  try {
    await db.prisma.projectMember.delete({
      where: {
        contactId_projectId: {
          contactId,
          projectId,
        },
      },
    });
    return true;
  } catch (error) {
    if (error.code === 'P2025') {
      return false; // Record not found
    }
    throw error;
  }
};

export const getProjectStats = async (projectId) => {
  const stats = await db.prisma.project.findUnique({
    where: { id: projectId },
    select: {
      _count: {
        select: {
          tasks: true,
          members: true,
        },
      },
      tasks: {
        select: {
          status: true,
        },
      },
    },
  });

  if (!stats) return null;

  const tasksByStatus = stats.tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return {
    totalTasks: stats._count.tasks,
    totalMembers: stats._count.members,
    tasksByStatus,
  };
};