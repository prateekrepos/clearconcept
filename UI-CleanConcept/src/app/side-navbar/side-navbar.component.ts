import { Component, OnInit , ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
 interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  @Output() content = new EventEmitter<any>();
  TREE_DATA1: FoodNode[];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(private http: HttpClient) {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {
    this.http.get<FoodNode[]>("assets/pagename.json").subscribe(data =>{
      this.TREE_DATA1=data;
      this.dataSource.data = this.TREE_DATA1;
     });
  }

  loadPageContent(pageName:String)
  {
    var assetUrl='assets/htmlpage/'+pageName+'.html';
    this.http.get(assetUrl,{responseType: "text"}).subscribe(
      data => {
        this.content.next(data);
      });
  }
}
