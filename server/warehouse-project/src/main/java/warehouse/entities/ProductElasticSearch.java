package warehouse.entities;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "products")
@Setter
@Getter
public class ProductElasticSearch {

    @Id
    private Long id;
    @Field(type = FieldType.Text, name = "name")
    private String name;
    @Field(type = FieldType.Keyword, name = "type")
    private String type;
    @Field(type = FieldType.Keyword, name = "colour")
    private String colour;
    @Field(type = FieldType.Keyword, name = "category")
    private String category;
    @Field(type = FieldType.Text, name = "description")
    private String description;
}


