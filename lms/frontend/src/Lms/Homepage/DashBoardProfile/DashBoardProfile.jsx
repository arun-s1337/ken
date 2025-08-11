
import { Indiviualmenu } from "./IndividualMenu/IndividualMenu";
import { Message } from "./Message/Message";
import { Payment } from "./Payment/Payment";

export default function DashBoardProfile() {
  return (
    <>
      <Indiviualmenu />
    </>
  );
}

export function DashBoardMessage() {
  return (
    <>
      <Message />
    </>
  );
}

export function DashBoardPayment() {
  return (
    <>
      <Payment />
    </>
  );
}
