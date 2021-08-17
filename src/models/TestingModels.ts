import UserModel, { UserData } from './userModel';
import { ObjectId } from 'bson';
import { TechObjects } from './techModel';
import { JobObjects } from './jobModel';
import { RepairOrderObjects } from './repairOrderModel';
import { PayPeriodObjects } from './payPeriodModel';

const devMode: boolean = process.env.NODE_ENV === 'development';

const add14Days = (mod: number = 0): number => {
  if (mod === 0) {
    return Date.now();
  }
  return Date.now() + (14 * 24 * 60 * 60 * 1000 * mod);
};

const buildUserTestData = (): UserData | null => {
  if (!devMode) {
    return null;
  }

  const createId = (): string => ObjectId.generate().toString();

  const ids: string[] = [];
  for (let i = 0; i < 100; i++) {
    ids.push(createId());
  }

  const techs: TechObjects = {
    [ids[0]]: {
      _id: ids[0],
      __v: 0,
      name: 'Cody Lantz',
      techId: 9242,
      activeJobs: []
    },
    [ids[1]]: {
      _id: ids[1],
      __v: 0,
      name: 'Jason Lantz',
      techId: 9243,
      activeJobs: []
    },
    [ids[2]]: {
      _id: ids[2],
      __v: 0,
      name: 'Mikey',
      techId: 1234,
      activeJobs: []
    },
    [ids[3]]: {
      _id: ids[3],
      __v: 0,
      name: 'Victor',
      techId: 7978,
      activeJobs: []
    },
  };

  const jobs: JobObjects = {
    [ids[4]]: {
      __v: 0,
      _id: ids[4],
      assignedTech: techs[ids[0]]._id,
      isRecall: false,
      name: 'Oil Change',
      time: 0.5,
    },
    [ids[5]]: {
      __v: 0,
      _id: ids[5],
      assignedTech: techs[ids[0]]._id,
      isRecall: false,
      name: 'Timing Belt',
      time: 4.5,
    },
    [ids[6]]: {
      __v: 0,
      _id: ids[6],
      assignedTech: techs[ids[1]]._id,
      isRecall: true,
      name: '20TA02 - Camry',
      time: 1.5,
    },
    [ids[7]]: {
      __v: 0,
      _id: ids[7],
      assignedTech: techs[ids[1]]._id,
      isRecall: false,
      name: 'Squeaky Noise from Dask',
      time: 0.1,
    },
  };

  const repairOrders: RepairOrderObjects = {
    [ids[8]]: {
      _id: ids[8],
      __v: 0,
      roNumber: 111111,
      date: new Date(Date.now()),
      isCompleted: false,
      jobs: [
        jobs[0]._id,
        jobs[1]._id,
      ],
    },
    [ids[9]]: {
      _id: ids[9],
      __v: 0,
      roNumber: 222222,
      date: new Date(Date.now()),
      isCompleted: false,
      jobs: [
        jobs[2]._id,
        jobs[3]._id,
      ],
    },
    [ids[10]]: {
      _id: ids[10],
      __v: 0,
      roNumber: 333333,
      date: new Date(Date.now()),
      isCompleted: true,
      jobs: [
        jobs[1]._id,
        jobs[3]._id,
      ],
    },
  };

  const payPeriods: PayPeriodObjects = {
    [ids[11]]: {
      _id: ids[11],
      __v: 0,
      startDate: new Date(add14Days()),
      endDate: new Date(add14Days(1)),
      repairOrders: [
        repairOrders[ids[8]]._id,
        repairOrders[ids[9]]._id,
      ]
    },
    [ids[12]]: {
      _id: ids[12],
      __v: 0,
      startDate: new Date(add14Days(1)),
      endDate: new Date(add14Days(2)),
      repairOrders: [
        repairOrders[ids[10]]._id,
      ]
    },
  };

  const user: UserModel = {
    _id: createId(),
    __v: 0,
    auth0Id: createId(),
    firstName: 'Cody',
    lastName: 'lantz',
    userName: 'Daxxn',
    dateCreated: new Date(Date.now()),
    isAdmin: true,
    payPeriods: [
      payPeriods[ids[11]]._id,
      payPeriods[ids[12]]._id,
    ]
  }

  return {
    user,
    repairOrders,
    jobs,
    payPeriods,
    techs,
  }
}

export default buildUserTestData;