package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.PaymentDTO;
import lk.easy.car_rental.entity.Payment;
import lk.easy.car_rental.repo.PaymentRepo;
import lk.easy.car_rental.repo.RentRepo;
import lk.easy.car_rental.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    PaymentRepo paymentRepo;

    @Autowired
    RentRepo rentRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void savePayment(PaymentDTO paymentDTO) throws RuntimeException {

        Payment payment = mapper.map(paymentDTO, Payment.class);
        payment.setRentId(rentRepo.findById(paymentDTO.getRentId().getRentId()).get());
        payment.setDate(LocalDate.now());
        payment.setTime(LocalTime.now());
        paymentRepo.save(payment);

    }

    @Override
    public List<PaymentDTO> loadAllPayments() throws RuntimeException {

        return mapper.map(paymentRepo.findAll(), new TypeToken<ArrayList<PaymentDTO>>() {
        }.getType());

    }

}
