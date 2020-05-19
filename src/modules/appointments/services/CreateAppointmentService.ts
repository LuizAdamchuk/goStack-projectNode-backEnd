import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { Appointment } from '@modules/appointments/infra/typeorm/entities/Appointment';
import { AppError } from '@shared/errors/AppError';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
export class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment already booked.');
    }
    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      provider_id,
    });

    return appointment;
  }
}
