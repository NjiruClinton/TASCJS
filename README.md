# installing
```
git clone <repo url>
```

# running
```javascript
timeAndSpaceComplexities('test.js');
```
test.js is the name of the file you want to test.

# results
```javascript
ModuleReport {
  aggregate: AggregateReport {
    aggregate: undefined,
    cyclomatic: 2,
    cyclomaticDensity: 66.667,
    halstead: HalsteadData {
      bugs: 0.049,
      difficulty: 6.955,
      effort: 1021.94,
      length: 34,
      time: 56.774,
      vocabulary: 20,
      volume: 146.946,
      operands: [Object],
      operators: [Object]
    },
    paramCount: 0,
    sloc: { logical: 3, physical: 4 }
  },
  settings: {
    commonjs: false,
    dependencyResolver: undefined,
    esmImportExport: { halstead: false, lloc: false },
    forin: false,
    logicalor: true,
    switchcase: true,
    templateExpression: { halstead: true, lloc: true },
    trycatch: false,
    newmi: false
  },
  classes: [],
  dependencies: [],
  errors: [],
  filePath: undefined,
  lineEnd: 4,
  lineStart: 1,
  maintainability: 128.811,
  methods: [],
  aggregateAverage: MethodAverage {
    cyclomatic: 2,
    cyclomaticDensity: 66.667,
    halstead: HalsteadAverage {
      bugs: 0.049,
      difficulty: 6.955,
      effort: 1021.94,
      length: 34,
      time: 56.774,
      vocabulary: 20,
      volume: 146.946,
      operands: [Object],
      operators: [Object]
    },
    paramCount: 0,
    sloc: { logical: 3, physical: 4 }
  },
  methodAverage: MethodAverage {
    cyclomatic: 0,
    cyclomaticDensity: 0,
    halstead: HalsteadAverage {
      bugs: 0,
      difficulty: 0,
      effort: 0,
      length: 0,
      time: 0,
      vocabulary: 0,
      volume: 0,
      operands: [Object],
      operators: [Object]
    },
    paramCount: 0,
    sloc: { logical: 0, physical: 0 }
  },
  srcPath: undefined,
  srcPathAlias: undefined
}
```#   T A S C J S  
 