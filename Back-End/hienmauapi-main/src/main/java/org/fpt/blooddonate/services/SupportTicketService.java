package org.fpt.blooddonate.services;

import org.fpt.blooddonate.dtos.requests.CreateSupportTicketRequestDTO;
import org.fpt.blooddonate.dtos.requests.UpdateStatusSupportTicketRequestDTO;
import org.fpt.blooddonate.models.SupportTicket;
import org.fpt.blooddonate.models.SupportTicketHistory;
import org.fpt.blooddonate.models.User;
import org.fpt.blooddonate.repositories.SupportTicketHistoryRepository;
import org.fpt.blooddonate.repositories.SupportTicketRepository;
import org.fpt.blooddonate.repositories.UserRepository;
import org.fpt.blooddonate.utils.SendEmail;
import org.fpt.blooddonate.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Optional;

@Service
public class SupportTicketService {
    @Autowired
    private SupportTicketRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SupportTicketHistoryRepository historyRepository;

    public Page<SupportTicket> getAll(int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        if (keyword != null && keyword.isEmpty()) {
            keyword = TextUtil.removeVietNamese(keyword);
        }
        return repository.paginated(status, keyword, pageable);
    }

    public SupportTicket getById(Integer id) {
        SupportTicket supportTicket = this.repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed support ticket"));

        return supportTicket;
    }

    public SupportTicket create(CreateSupportTicketRequestDTO payload) throws IOException {
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = new User();
        user.setId(userId);
        SupportTicket supportTicket = new SupportTicket();
        supportTicket.setNguoiDung(user);
        supportTicket.setEmail(payload.getEmail());
        supportTicket.setTieuDe(payload.getTieude());
        supportTicket.setNoiDung(payload.getNoidung());
        supportTicket.setHoTen(payload.getHoten());
        supportTicket.setSoDienThoai(payload.getSodienthoai());
        SupportTicket inserted = repository.save(supportTicket);

        SupportTicketHistory history = new SupportTicketHistory();
        history.setSupportTicket(inserted);
        history.setGhiChu("User create new support ticket");
        historyRepository.save(history);
        return inserted;
    }

    public Optional<SupportTicket> updateStatus(Integer id, UpdateStatusSupportTicketRequestDTO payload) throws IOException {
        return repository.findById(id).map(supportTicket -> {
            supportTicket.setTrangThai(payload.getTrangthai());
            repository.save(supportTicket);

            // Update support ticket history
            SupportTicketHistory history = new SupportTicketHistory();
            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed user"));

            user.setId(userId);
            history.setSupporter(user);
            history.setSupportTicket(supportTicket);
            history.setTrangThai(payload.getTrangthai());
            history.setGhiChu(payload.getGhichu());
            historyRepository.save(history);

            SendEmail.changeSupportTicketStatus(supportTicket.getEmail(), id, payload.getTrangthai());
            return supportTicket;
        });
    }
}
