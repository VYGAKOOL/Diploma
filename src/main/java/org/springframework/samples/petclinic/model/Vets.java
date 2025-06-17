package org.springframework.samples.petclinic.model;

import java.util.ArrayList;
import java.util.List;

public class Vets {

    private List<Vet> vetList = new ArrayList<>();

    public List<Vet> getVetList() {
        return vetList;
    }

    public void setVetList(List<Vet> vetList) {
        this.vetList = vetList;
    }
}
