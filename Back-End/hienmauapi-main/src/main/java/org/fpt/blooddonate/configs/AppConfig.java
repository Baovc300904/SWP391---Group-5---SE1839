package org.fpt.blooddonate.configs;

public class AppConfig {
    public static final String APP_NAME = "blooddonate";
    public static final int ACTIVE_STATUS = 1;
    public static final int INACTIVE_STATUS = 0;
    public static final String USER_CUSTOMER_ROLE = "nguoidung";
    public static final String USER_EMPLOYEE_ROLE = "nhanvien";
    public static final String BLOOD_DONATION_ACTIVITY_COMMING_SOOM = "sapdienra";

    public static final String BLOOD_DONATION_REQUEST_PENDING = "dangcho";
    public static final String BLOOD_DONATION_REQUEST_CANCEL = "huy";
    public static final String BLOOD_DONATION_REQUEST_APPROVED = "xacnhan";
    public static final String BLOOD_DONATION_REQUEST_REJECTED = "tuchoi";
    public static final String BLOOD_DONATION_REQUEST_COMPLETED = "dahien";

    public static final String BLOOD_UNIT_WAREHOUSE_READY = "sansang";
    public static final String BLOOD_UNIT_WAREHOUSE_COMPLETED = "dasudung";
    public static final String BLOOD_UNIT_WAREHOUSE_CANCEL = "huybo";
    public static final String BLOOD_UNIT_WAREHOUSE_WAIT_FOR_TESTING = "choxetnghiem";

    public static final String BLOOD_RECEIVE_REQUEST_PENDING = "dangcho";
    public static final String BLOOD_RECEIVE_REQUEST_CANCEL = "huy";
    public static final String BLOOD_RECEIVE_REQUEST_HAVE_BLOOD = "dacomau";
    public static final String BLOOD_RECEIVE_REQUEST_COMPLETED = "dahoanthanh";
}
