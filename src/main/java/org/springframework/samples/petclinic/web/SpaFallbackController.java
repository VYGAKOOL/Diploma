package org.springframework.samples.petclinic.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class SpaFallbackController {

    @GetMapping("/{path}")
    public String forwardSimple(@PathVariable("path") String path) {
        return "forward:/index.html";
    }
}
