import { Appointment } from '@modules/appointments/infra/typeorm/entities/Appointment';

import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';

export interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}
