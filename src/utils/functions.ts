import { User } from "../models";

export function objectLengthVerification(value: object): boolean {
  if (Object.keys(value).length > 0) {
    return true;
  }

  return false;
}

export function findElementInArray(data: Array<User>, valueUser: User) {
  const userVerification = data.find(
    (value: User) =>
      value.senha === valueUser.senha && value.nome === valueUser.nome
  );

  return userVerification;
}

export function compareSimilarUsersInLocalStorage(
  data: Array<User>,
  userValue: User
) {
  const hasEqualsUserName = data.filter(
    (value: User) => value.nome === userValue.nome
  );

  if (hasEqualsUserName.length > 0) {
    return true;
  }

  return false;
}
export function compareSimilarUsersWithExcessInLocalStorage(
  dataArray: Array<User>,
  data: User,
  userExcess: string
) {
  if (data.nome === userExcess) {
    return false;
  }

  const hasEqualsUserName = dataArray.filter(
    (value: User) => value.nome === data.nome
  );

  if (hasEqualsUserName.length > 0) {
    return true;
  }

  return false;
}
