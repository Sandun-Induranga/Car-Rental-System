package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.PaymentDTO;
import lk.easy.car_rental.entity.Payment;
import lk.easy.car_rental.entity.Rent;
import lk.easy.car_rental.repo.PaymentRepo;
import lk.easy.car_rental.repo.RentRepo;
import lk.easy.car_rental.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
        Rent rent = rentRepo.findById(paymentDTO.getRentId().getRentId()).get();
        payment.setRentId(rent);
        payment.setDate(LocalDate.now());
        payment.setTime(LocalTime.now());
        paymentRepo.save(payment);

    }

    @Override
    public List<PaymentDTO> loadAllPayments() throws RuntimeException {

        return mapper.map(paymentRepo.findAll(), new TypeToken<ArrayList<PaymentDTO>>() {
        }.getType());

    }

    @Override
    public List<PaymentDTO> getPaymentsByNic(String nic) throws RuntimeException {

        return mapper.map(paymentRepo.findAllByRentId_Nic_Nic(nic), new TypeToken<ArrayList<PaymentDTO>>() {
        }.getType());

    }

    @Override
    public List getDailyIncome() throws RuntimeException {

        return paymentRepo.getDailyIncome();

    }

    @Override
    public List getMonthlyIncome() throws RuntimeException {

        return paymentRepo.getMonthlyIncome();

    }

    @Override
    public List getYearlyIncome() throws RuntimeException {
        return paymentRepo.getYearlyIncome();
    }

    @Override
    public BigDecimal getCurrentDayIncome() throws RuntimeException {

        return paymentRepo.getCurrentDayIncome();

    }

    @Override
    public BigDecimal getCurrentMonthIncome() throws RuntimeException {

        return paymentRepo.getCurrentMonthIncome();

    }

    @Override
    public BigDecimal getCurrentYearIncome() throws RuntimeException {

        return paymentRepo.getCurrentYearIncome();

    }

}
