package org.fpt.blooddonate.dtos.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ChangeStatusBloodReceiveRequestToAvailable {

    private List<Integer> danhSachKhoDonViMau;
}
