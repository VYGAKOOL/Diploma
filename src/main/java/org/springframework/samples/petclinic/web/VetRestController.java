package org.springframework.samples.petclinic.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.samples.petclinic.model.Vets;
import org.springframework.samples.petclinic.repository.VetRepository;

@RestController
@RequestMapping("/api/vets")
public class VetRestController {

    private final VetRepository vets;

    public VetRestController(VetRepository vets) {
        this.vets = vets;
    }

    @GetMapping
    public Vets listVets() {
        Vets list = new Vets();
        list.getVetList().addAll(this.vets.findAll());
        return list;
    }
}
