# React Validation
#### Validation Library For React (we like tautological subheaders here)

This is a mix of validation stuff I have written in the past and new ideas. This is just a sketch--there are dependencies and testing needed, but it's a sufficient demonstration of the basic
ideas, I think.

The concept is that any React component can be marked as something validatable using the decorator provided, like so:

```
@validatable
class MyComp extends React.Component{
}
```

or like so, depending on whether your toolchain supports ES7 decs:

```
class MyComp extends React.Component {
}

validatable(MyComp);
```

There will also be a decorator for forms which will allow a form to gather all of its validatable components and validate them at will.

The way a validation rule is put onto a component is imagined to look something like this:

```
<MyComp validation={[{rule: Min, length: 3}]}
```

Rules are very easy to create. Also, they have default error messages. In this case, that would be something like: "Length of MyComp must be at least 3 chars".

Also, they have priorities, so that only one error message can be displayed at a time if desired, and this is configurable according to the component.

```
<MyComp validation={[{rule: Email}, {rule: Required}]} />
```

By default, Required comes before Email (it has to be there in order to check if it's an email). But if you wanted to be contrarian:

```
<MyComp validation={[{rule: Email, priority: 0}, {rule: Required, priority: 10}]} />
```

Anyways, the concept will require more thought and code refactoring. And I need to add a decorator for the whole form, and probably add other concepts in here as well. 

Forms are kind of a crappy experience in React, it turns out. But I have had a decent time with this sort of concept in the past.

