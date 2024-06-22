package com.rr.controller;
import com.rr.entity.Publication;
import com.rr.repository.PublicationRepository;

@Controller
@RestController
@RequestMapping("/api")

public class PublicationController{
    private PublicationRepository publicationrepository;

    @Autowired
    public allpublications(PublicationRepository publicationrepository){

        this.publicationrepository = publicationrepository;
    }

    @GetMapping("/publications/list")
    public List<Publication> getallpublications(){

        return publicationrepository.findAll();
    }

}
