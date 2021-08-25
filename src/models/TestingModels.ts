import UserModel, { UserData } from './userModel';
// import { ObjectId } from 'bson';
import { TechObjects } from './techModel';
import { JobObjects } from './jobModel';
import { RepairOrderObjects } from './repairOrderModel';
import { PayPeriodObjects } from './payPeriodModel';

const idLen = 24;
const devMode: boolean = process.env.NODE_ENV === 'development';

const add14Days = (mod = 0): number => {
  if (mod === 0) {
    return Date.now();
  }
  return Date.now() + 14 * 24 * 60 * 60 * 1000 * mod;
};

const buildUserTestData = (): UserData | null => {
  if (!devMode) {
    return null;
  }

  const createId = (): string => {
    // const obj = ObjectId.generate();
    // var str = '';
    // obj.forEach(s => str += String.fromCharCode(s));
    // console.log(str);
    // return str;
    return createCustomId();
  };

  const createCustomId = (): string => {
    let output = '';
    for (let i = 0; i < idLen; i++) {
      const result = rollNumber();
      output += result;
    }
    return output;
  };

  const rollNumber = (): number => {
    const rollA = Math.round(Math.random() * 10);
    const rollB = Math.round(Math.random() * 10) ** 2;
    const xor = rollA ^ rollB;
    return xor & 9;
  };

  const ids: string[] = [];
  for (let i = 0; i < 20; i++) {
    ids.push(createId());
  }

  console.log(ids);

  const techs: TechObjects = {
    [ids[0]]: {
      _id: ids[0],
      __v: 0,
      name: 'Cody Lantz',
      techNumber: 9242,
    },
    [ids[1]]: {
      _id: ids[1],
      __v: 0,
      name: 'Jason Lantz',
      techNumber: 9243,
    },
    [ids[2]]: {
      _id: ids[2],
      __v: 0,
      name: 'Mikey',
      techNumber: 1234,
    },
    [ids[3]]: {
      _id: ids[3],
      __v: 0,
      name: 'Victor',
      techNumber: 7978,
    },
  };

  const jobs: JobObjects = {
    [ids[4]]: {
      __v: 0,
      _id: ids[4],
      description: 'Simple Oil Change.',
      assignedTech: techs[ids[0]]._id,
      isRecall: false,
      name: 'Oil Change',
      time: 0.5,
      isCompleted: false,
    },
    [ids[5]]: {
      __v: 0,
      _id: ids[5],
      description: 'Replace timing belt and water pump.',
      assignedTech: techs[ids[0]]._id,
      isRecall: false,
      name: 'Timing Belt',
      time: 4.5,
      isCompleted: true,
    },
    [ids[6]]: {
      __v: 0,
      _id: ids[6],
      description: 'Replace low-pressure fuel pump.',
      assignedTech: techs[ids[1]]._id,
      isRecall: true,
      name: '20TA02 - Camry',
      time: 1.5,
      isCompleted: true,
    },
    [ids[7]]: {
      __v: 0,
      _id: ids[7],
      description: 'Diag squeaking noise from dash.',
      assignedTech: techs[ids[1]]._id,
      isRecall: false,
      name: 'Squeaky Noise from Dash',
      time: 0.1,
      isCompleted: false,
    },
  };

  const repairOrders: RepairOrderObjects = {
    [ids[8]]: {
      _id: ids[8],
      __v: 0,
      roNumber: 111111,
      flagId: 1,
      date: new Date(Date.now()),
      isCompleted: false,
      jobs: [jobs[ids[4]]._id, jobs[ids[5]]._id],
    },
    [ids[9]]: {
      _id: ids[9],
      __v: 0,
      roNumber: 222222,
      flagId: 2,
      date: new Date(Date.now()),
      isCompleted: false,
      jobs: [jobs[ids[6]]._id, jobs[ids[7]]._id],
    },
    [ids[10]]: {
      _id: ids[10],
      __v: 0,
      roNumber: 333333,
      flagId: 3,
      date: new Date(Date.now()),
      isCompleted: true,
      jobs: [jobs[ids[4]]._id, jobs[ids[7]]._id],
    },
  };

  const payPeriods: PayPeriodObjects = {
    [ids[11]]: {
      _id: ids[11],
      __v: 0,
      startDate: new Date(add14Days()),
      endDate: new Date(add14Days(1)),
      repairOrders: [repairOrders[ids[8]]._id, repairOrders[ids[9]]._id],
    },
    [ids[12]]: {
      _id: ids[12],
      __v: 0,
      startDate: new Date(add14Days(1)),
      endDate: new Date(add14Days(2)),
      repairOrders: [repairOrders[ids[10]]._id],
    },
  };

  const user: UserModel = {
    _id: createId(),
    __v: 0,
    email: 'nunjalantz@gmail.com',
    firstName: 'Cody',
    lastName: 'lantz',
    userName: 'Daxxn',
    dateCreated: new Date(Date.now()),
    isAdmin: true,
    isAuthenticated: false,
    payPeriods: [payPeriods[ids[11]]._id, payPeriods[ids[12]]._id],
  };

  const data: UserData = {
    user,
    repairOrders,
    jobs,
    payPeriods,
    techs,
  };

  console.log(data);

  return data;
};

export default buildUserTestData;
