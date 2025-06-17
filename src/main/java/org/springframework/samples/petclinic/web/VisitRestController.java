package org.springframework.samples.petclinic.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.samples.petclinic.repository.VisitRepository;

import java.util.Collection;


@RestController
@RequestMapping("/api/owners/{ownerId}/pets/{petId}/visits")
public class VisitRestController {

    private final VisitRepository visits;

    public VisitRestController(VisitRepository visits) {
        this.visits = visits;
    }


    @GetMapping
    public Collection<Visit> listVisits(@PathVariable("petId") Integer petId) {
        return this.visits.findByPetId(petId);
    }


    @PostMapping
    public Visit createVisit(@PathVariable("petId") Integer petId,
                             @RequestBody Visit visit) {

        this.visits.save(visit);
        return visit;
    }
}
