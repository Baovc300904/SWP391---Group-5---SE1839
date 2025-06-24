package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.SupportTicketHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportTicketHistoryRepository extends JpaRepository<SupportTicketHistory, Integer> {
    @Query("SELECT h FROM SupportTicketHistory h WHERE h.supportTicket.id = :ticketId")
    List<SupportTicketHistory> findAllBySupportTicketId(@Param("ticketId") Integer ticketId);

}