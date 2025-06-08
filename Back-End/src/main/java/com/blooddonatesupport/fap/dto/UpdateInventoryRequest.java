
package com.blooddonatesupport.fap.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Data
public class UpdateInventoryRequest {

    @NotNull(message = "ID đơn vị máu không được để trống")
    @Positive(message = "ID đơn vị máu phải lớn hơn 0")
    private Integer bloodUnitId; // ✅ Sửa từ bloodGroup thành bloodUnitId

    @NotNull(message = "Số lượng mới không được để trống")
    @DecimalMin(value = "0.0", message = "Số lượng không thể âm")
    @DecimalMax(value = "9999.99", message = "Số lượng không được vượt quá 9999.99")
    private BigDecimal newQuantity; // ✅ Sửa từ changeAmount thành newQuantity và đổi type thành BigDecimal
}