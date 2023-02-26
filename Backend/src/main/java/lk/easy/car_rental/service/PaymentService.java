package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.PaymentDTO;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface PaymentService {

    public void savePayment(PaymentDTO paymentDTO) throws RuntimeException;

    public List<PaymentDTO> loadAllPayments() throws RuntimeException;

    public List<PaymentDTO> getPaymentsByNic(String nic) throws RuntimeException;

    public List getDailyIncome() throws RuntimeException;

}
